import { atomWithStorage } from "jotai/utils";

export const userObject = atomWithStorage("user", {
  trackingID: "",
  name: "",
  mpesaNumber: "",
  idNumber: "",
  loanType: "",
  crbStatusReport: 0,
  loanAmount: 0,
  fee: 0,
  accountStatus: false,
  registered: false,
});

export const mpesaCodes = atomWithStorage("codes", []);
