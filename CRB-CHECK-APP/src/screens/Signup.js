import React from "react";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import ColorSchemeToggle from "../components/ColorSchemeToggle";
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Option,
  Select,
} from "@mui/joy";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import url from "../crb.png";
import signupImage from "../creditscore.webp";

import { userObject } from "../state";
<ColorSchemeToggle />;

const customTheme = extendTheme({ defaultColorScheme: "dark" });

export default function JoySignInSideTemplate() {
  const navigate = useNavigate();
  const navigateToGet = () => {
    navigate("/get");
  };

  function randomAmount(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const [user, setUser] = useAtom(userObject);
  const [open, setOpen] = React.useState(false);

  const [message, setMessage] = React.useState("Registering User");
  const [timer, setTimer] = React.useState(0);

  if (user.registered) {
    navigate("/get");
  }

  return (
    <CssVarsProvider theme={customTheme} disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.1)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{ py: 3, display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <Typography level="title-lg">CRB STATUS CHECKER</Typography>
              <Avatar
                variant={"rounded"}
                alt="The image"
                src={url}
                style={{
                  width: 38,
                  height: 38,
                }}
              />
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack sx={{ gap: 2, mb: 2 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography component="h2" level="h2">
                  Check Your CRB Status
                </Typography>
                <Divider
                  sx={(theme) => ({
                    [theme.getColorSchemeSelector("dark")]: {
                      color: { xs: "#FFF", md: "text.tertiary" },
                    },
                  })}
                ></Divider>
              </Stack>
              <Card variant="outlined">
                <CardContent>
                  <Typography component="h1" level="h5">
                    Apply and get your CRB Status Report in just 5 Minutes
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
            <Stack sx={{ mt: 2 }}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  var amount = 0; // Adjust based on your form logic if amount is set elsewhere

                  console.log("Loan name selected", formJson.loan);

                  setOpen(true);
                  setMessage(
                    "Capturing User Details & Generating CRB Status Report"
                  );

                  // User Details Progress Simulation (0% to 100%)
                  let userProgress = 0;
                  const registrationInterval = setInterval(() => {
                    if (userProgress < 100) {
                      userProgress += 1.33; // Increment by 10.33 to complete in 3 seconds
                      setTimer(Math.round(userProgress)); // Update the progress timer
                    } else {
                      clearInterval(registrationInterval); // Stop the interval once 100% is reached
                      setMessage("Checking CRB status");
                      setUser((prev) => ({
                        ...prev,
                        trackingID: Math.random().toString(36).slice(2),
                        name: formJson.name,
                        mpesaNumber: formJson.phone,
                        idNumber: formJson.id,
                        loanType: formJson.loan,
                        crbStatusReport: randomAmount(310, 500),
                        loanAmount: amount,
                        fee: 100,
                        accountStatus: false,
                        registered: true,
                      }));
                      setTimer(0); // Reset the timer for the next phase
                      startCRBStatusCheck(); // Start the CRB status check process
                    }
                  }, 100); // Update the progress every 100ms for a smooth bar transition

                  // Function to simulate checking CRB status (0% to 100%)
                  const startCRBStatusCheck = () => {
                    let crbProgress = 0;
                    const crbInterval = setInterval(() => {
                      if (crbProgress < 100) {
                        crbProgress += 3; // Increment by 3% for each interval (this simulates a longer process)
                        setTimer(Math.round(crbProgress)); // Update the CRB status progress
                      } else {
                        clearInterval(crbInterval); // Stop the CRB status check when complete
                        setMessage("CRB Status Checked"); // Final message once CRB check is done
                        navigateToGet(); // Navigate to the next page (or function after CRB status check)
                      }
                    }, 30); // Update every 30ms for CRB status check
                  };
                }}
              >
                <FormControl required>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="name"
                    placeholder="Enter your full name as per your ID"
                    name="name"
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter your M-PESA registred phone number"
                    name="phone"
                  />
                </FormControl>
                {/* <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email" />
                </FormControl> */}
                <FormControl required>
                  <FormLabel>ID Number</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter your ID Number"
                    name="id"
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Reason or Purpose For Application</FormLabel>
                  <Select placeholder="Select loan type" name="loan" required>
                    <Option value="Loan Application">Loan Application</Option>
                    <Option value="Negative Listing">Negative Listing</Option>
                    <Option value="Job Application">Job Application</Option>
                    <Option value="Personal Interest">Personal Interest</Option>
                    <Option value="Legal Purpose">Legal Purpose</Option>
                  </Select>
                </FormControl>
                <Stack sx={{ gap: 4, mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      // justifyContent: 'space-between',
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h1" level="h5">
                      Instant CRB Status Verification. In just 5 Minutes
                    </Typography>
                  </Box>
                  <Button
                    style={{ backgroundColor: "#00CC71" }}
                    type="submit"
                    fullWidth
                  >
                    FIND OUT YOUR CRB STATUS
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }} backgroundColor="primary.main">
            <Typography level="body-xs" sx={{ textAlign: "center" }}>
              © CRB Status Checker {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: {
            xs: "none", // Remove background image on small screens
            md: `url(${signupImage})`, // Apply background image on medium and larger screens
          },
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: `url(${signupImage})`,
          },
        })}
      />
      <Modal
        aria-labelledby="close-modal-title"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute", // Ensures the modal uses full screen size
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: 300,
            borderRadius: "md",
            p: 3,
            display: "flex",
            flexDirection: "column", // Ensures the children are aligned in column
            alignItems: "center", // Centers the children horizontally
            justifyContent: "center", // Centers the children vertically
          }}
        >
          <ModalClose variant="outlined" />
          <Typography
            component="h2"
            id="close-modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: "lg", textAlign: "center" }} // Centers the text inside Typography
          >
            Please Wait ...
            <p>{message}</p>
            <p>Progress: {timer}%</p>
            <CircularProgress />
          </Typography>
        </Sheet>
      </Modal>
    </CssVarsProvider>
  );
}
