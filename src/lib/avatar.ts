const senderImages: Record<string, string> = {
  "Elena Smith": "/email-elena-smith.png",
  "Emma Reeves": "/email-emma-reeves.png",
  "Adrian Engman": "/email-adrian-engman.png",
  "Claire Bennett": "/email-claire-bennett.png",
  "Daniel Brooks": "/email-daniel-brooks.png",
  "Lena Foster": "/email-lena-foster.png",
  "Maya Lopez": "/email-maya-lopez.png",
  "Nina Mercer": "/email-nina-mercer.png",
  Stripe: "/email-stripe-logo.png",
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