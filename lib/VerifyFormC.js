"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const keysToCheckSubmit = {
  description: "Description",
  contactName: "Contact Name",
  contactEmail: "Contact Email",
  contactPhone: "Contact Phone",
  KFS: "KFS"
};
const keysToCheckApproval = {
  contactName: "Contact Name",
  KFS: "KFS #",
  illustrator: "Illustrator",
  contactName: "",
  hours: "Hours",
  hoursPM: "Hours +-",
  deadlineFinal: "Final Deadline",
  illustratorSig: "Illustrator Signature",
  signDate2: "Illustrator Signature Date"
};
const keysToCheckSign = {
  contactSig: "Signature",
  signDate1: "Signature Date"
};
function verify(data, form = 'submit') {
  let check = {};
  switch (form) {
    case 'submit':
      check = keysToCheckSubmit;
      break;
    case 'approve':
      check = keysToCheckApproval;
      break;
    case 'sign':
      check = keysToCheckSign;

  }
  let keysToCheck = global.Object.keys(check);
  for (let index = 0; index < keysToCheck.length; index++) {
    // For some reason, a for...of loop will crash
    let key = keysToCheck[index];
    if (key === "KFS" && data.cover) continue;
    if (!data[key] || data[key] === "") return `Missing Field: ${check[key]}`;
  }
  return 0;
}

exports.default = verify;
