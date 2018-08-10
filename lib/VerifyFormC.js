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
  contactSig: "Contact Signature",
  illustratorSig: "Illustrator Signature",
  signDate1: "Illustrator Signature Date",
  signDate2: "Contact Signature Date"
};
function verify(data, form = 'submit') {
  let check = form === 'submit' ? keysToCheckSubmit : keysToCheckApproval;
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
