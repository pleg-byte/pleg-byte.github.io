import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Stack,
  Input,
  Typography,
} from "@mui/joy";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userObject, mpesaCodes } from "../state";

export default function VerificationModal() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userObject);
  const [mpesaCodeList, setMpesaCodeList] = useAtom(mpesaCodes);
  const [open, setOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [messageError, setMessageError] = useState(false);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(
          "https://gekila.github.io/CRB-CHECKER-DETAILS/details.json"
        );
        const data = await response.json();
        setPaymentDetails(data.mpesaPaymentDetails);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };
    fetchPaymentDetails();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message");

    if (!paymentDetails.tillName || !message) {
      setMessageError(true);
      return;
    }

    const mpesaMessageParts = message.split(" ");
    const tillNameParts = paymentDetails.tillName.split(" ");

    const isCodeInvalid = mpesaCodeList.includes(mpesaMessageParts[0]);
    const isTillNameMismatch = tillNameParts[0] !== mpesaMessageParts[5];

    if (isCodeInvalid || isTillNameMismatch) {
      setMessageError(true);
      return;
    }

    setMessageError(false);
    setUser((prev) => ({ ...prev, accountStatus: true }));
    setOpen(false);
    navigate("/report");
  };

  return (
    <>
      <Button
        style={{ backgroundColor: "#00CC71" }}
        fullWidth
        onClick={() => setOpen(true)}
      >
        CONFIRM VERIFICATION
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Verify Payments</DialogTitle>
          <DialogContent>
            Copy the confirmation message you received from M-PESA after making
            payments, paste it below, and click "Verify."
          </DialogContent>
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>M-PESA Message</FormLabel>
                <Input
                  placeholder="Paste M-PESA message here"
                  name="message"
                  error={messageError}
                  required
                  minRows={2}
                />
                {messageError && (
                  <Typography color="danger">
                    Invalid M-PESA message. Please try again.
                  </Typography>
                )}
              </FormControl>
              <Button type="submit" style={{ backgroundColor: "#00CC71" }}>
                VERIFY
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}
