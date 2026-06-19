import adrianEngman from "@/assets/email-adrian-engman.png.asset.json";
import claireBennett from "@/assets/email-claire-bennett.png.asset.json";
import danielBrooks from "@/assets/email-daniel-brooks.png.asset.json";
import elenaSmith from "@/assets/email-elena-smith.png.asset.json";
import emmaReeves from "@/assets/email-emma-reeves.png.asset.json";
import lenaFoster from "@/assets/email-lena-foster.png.asset.json";
import mayaLopez from "@/assets/email-maya-lopez.png.asset.json";
import ninaMercer from "@/assets/email-nina-mercer.png.asset.json";
import stripeLogo from "@/assets/email-stripe-logo.png.asset.json";

const senderImages: Record<string, string> = {
  "Elena Smith": elenaSmith.url,
  "Emma Reeves": emmaReeves.url,
  "Adrian Engman": adrianEngman.url,
  "Claire Bennett": claireBennett.url,
  "Daniel Brooks": danielBrooks.url,
  "Lena Foster": lenaFoster.url,
  "Maya Lopez": mayaLopez.url,
  "Nina Mercer": ninaMercer.url,
  Stripe: stripeLogo.url,
};

const senderEmails: Record<string, string> = {
  "Elena Smith": "elena.smith@harwicksterne.com",
  "Emma Reeves": "emma.reeves@hartleytrust.com",
  "Adrian Engman": "adrian@sterlingholdings.com",
  "Claire Bennett": "claire@caldwellestate.com",
  "Daniel Brooks": "daniel@marlowcap.com",
  "Lena Foster": "lena@beaumontgroup.com",
  "Maya Lopez": "maya@castellanosholdings.com",
  "Nina Mercer": "nina@merceradvisory.com",
  Stripe: "notifications@stripe.com",
};

/**
 * Uses uploaded photos for known senders and falls back to a deterministic avatar.
 */
export function avatarUrl(name: string, size = 96): string {
  const mappedImage = senderImages[name];
  if (mappedImage) return mappedImage;

  const seed = name.trim().toLowerCase().replace(/\s+/g, "-");
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
}

export function senderEmailAddress(name: string): string {
  return senderEmails[name] ?? `${name.toLowerCase().split(" ").join(".")}@harwicksterne.com`;
}