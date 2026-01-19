import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";
import { httpRouter } from "convex/server";

const validatePayload = async (req) => {
    const payload = await req.text();

    const svixId = req.headers.get("svix-id");
    const svixTimestamp = req.headers.get("svix-timestamp");
    const svixSignature = req.headers.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
        console.error("❌ Missing required Svix headers");
        throw new Error("Missing Svix headers");
    }

    const svixHeaders = {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
    };

    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    try {
        return webhook.verify(payload, svixHeaders);
    } catch (err) {
        console.error("❌ Clerk webhook verification failed:", err);
        throw new Error("Webhook verification failed");
    }
};

const handleClerkWebhook = httpAction(async (ctx, req) => {
    const event = await validatePayload(req);

    if (!event?.type || !event.data?.id) {
        return new Response("Invalid payload", { status: 400 });
    }

    switch (event.type) {
        case "user.created":
        case "user.updated": {
            console.log(`👤 Syncing user: ${event.data.id}`);

            await ctx.runMutation(internal.user.create, {
                username: `${event.data.first_name ?? ""} ${event.data.last_name ?? ""}`.trim() || event.data.username || "Anonymous",
                clerkId: event.data.id,
                email: event.data.email_addresses?.[0]?.email_address || "",
                imgUrl: event.data.image_url,
            });

            break;
        }

        case "user.deleted": {
            console.log(`🗑️ Deleting user: ${event.data.id}`);
            await ctx.runMutation(internal.user.deleteUser, { clerkId: event.data.id });
            break;
        }

        default:
            console.log(`⚠️ Clerk event not handled: ${event.type}`);
    }

    return new Response(null, { status: 200 });
});


const http = httpRouter();

http.route({
    path: "/clerk-users-webhook",
    method: "POST",
    handler: handleClerkWebhook,
});

export default http;
