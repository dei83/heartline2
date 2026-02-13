import { PublicMessage } from "@/types";
import { popularMessages } from "./popular";
import { supportMessages } from "./support";
import { socialMessages } from "./social";
import { celebrationMessages } from "./celebration";
import { workplaceMessages } from "./workplace";
import { relationshipMessages } from "./relationships";
import { longMessages } from "./long-messages";
import { missYouMessages } from "./miss-you";
import { expandedMessages } from "./expanded-set";
import { mothersDayMessages } from "./mothers-day";
import { congratsMessages } from "./congrats";
import { newBabyMessages } from "./new-baby";

export const defaultMessages: Omit<PublicMessage, "id" | "likes">[] = [
    ...popularMessages,
    ...supportMessages,
    ...socialMessages,
    ...celebrationMessages,
    ...workplaceMessages,
    ...relationshipMessages,
    ...longMessages,
    ...missYouMessages,
    ...expandedMessages,
    ...mothersDayMessages,
    ...congratsMessages,
    ...newBabyMessages
];
