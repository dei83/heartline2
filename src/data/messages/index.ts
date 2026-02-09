import { PublicMessage } from "@/types";
import { popularMessages } from "./popular";
import { supportMessages } from "./support";
import { socialMessages } from "./social";
import { celebrationMessages } from "./celebration";

export const defaultMessages: Omit<PublicMessage, "id" | "likes">[] = [
    ...popularMessages,
    ...supportMessages,
    ...socialMessages,
    ...celebrationMessages
];
