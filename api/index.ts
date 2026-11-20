import { AppointmentController } from "../src/server/controllers/AppointmentController";
import { AuthController } from "../src/server/controllers/AuthController";
import { BookingLinkController } from "../src/server/controllers/BookingLinkController";
import { CommunityEventController } from "../src/server/controllers/CommunityEventController";
import { PlannerController } from "../src/server/controllers/PlannerController";
import { PushController } from "../src/server/controllers/PushController";
import { SlotController } from "../src/server/controllers/SlotController";
import { VersionController } from "../src/server/controllers/VersionController";
import { initializeDatabase } from "../src/server/db/database";
import { createOpenApiDocument } from "../src/server/docs/openapi";
import { createFetchHandler } from "../src/server/http/createServer";
import { loadLanguageFromDB } from "../src/server/i18n";
import { MailService } from "../src/server/mail/MailService";

let handlerPromise: Promise<(request: Request) => Promise<Response>> | null =
	null;

async function getHandler(): Promise<(request: Request) => Promise<Response>> {
	if (!handlerPromise) {
		handlerPromise = (async () => {
			await initializeDatabase();
			await loadLanguageFromDB();

			const dependencies = {
				authController: new AuthController(),
				slotController: new SlotController(),
				appointmentController: new AppointmentController(),
				bookingLinkController: new BookingLinkController(),
				pushController: new PushController(),
				plannerController: new PlannerController(),
				communityEventController: new CommunityEventController(),
				versionController: new VersionController(),
				mailService: new MailService(),
				openApiDocument: createOpenApiDocument(),
			};

			return createFetchHandler(dependencies);
		})();
	}
	return handlerPromise;
}

export default {
	async fetch(request: Request): Promise<Response> {
		const handler = await getHandler();
		return handler(request);
	},
};
