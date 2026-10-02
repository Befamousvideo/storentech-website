/**
 * Class 107: assemble operator contact only at click time.
 * Do not call these from a Server Component — decoded values must
 * never enter RSC payload, HTML, or a static file.
 */

const KEY = 29;
const PHONE = [54, 44, 42, 44, 41, 43, 44, 46, 37, 40, 40, 42] as const;
const EMAIL = [
  107, 116, 115, 126, 120, 115, 105, 93, 110, 105, 114, 111, 120, 115, 105,
  120, 126, 117, 51, 126, 114, 112,
] as const;

const DISPLAY_NAME = "Sarah – StorenTech Break Glass";
const ORG = "StorenTech";

export const VCARD_FILENAME = "Sarah - StorenTech Break Glass.vcf";

function decode(parts: readonly number[]) {
  let out = "";
  for (let i = 0; i < parts.length; i += 1) {
    out += String.fromCharCode(parts[i]! ^ KEY);
  }
  return out;
}

export function assemblePhone() {
  return decode(PHONE);
}

export function assembleEmail() {
  return decode(EMAIL);
}

export function assembleTelHref() {
  return ["te", "l:", assemblePhone()].join("");
}

export function assembleVCard() {
  const phone = assemblePhone();
  const email = assembleEmail();
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${DISPLAY_NAME}`,
    `ORG:${ORG}`,
    `TEL;TYPE=VOICE,WORK:${phone}`,
    `EMAIL;TYPE=WORK:${email}`,
    "END:VCARD",
    "",
  ].join("\r\n");
}

export function dialAssembledTel() {
  window.location.href = assembleTelHref();
}

export function downloadAssembledVCard() {
  const vcard = assembleVCard();
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const ios =
    /iP(ad|hone|od)/i.test(navigator.userAgent) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  if (ios) {
    window.location.href = url;
    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    return;
  }

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = VCARD_FILENAME;
  anchor.rel = "noopener";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}
