import { Paper, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const LoginPages = () => {
  const [tab, setTab] = React.useState<0 | 1>(0);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography marginBottom={"5rem"} variant="h3">
        BookWarriorApp
      </Typography>
      <Paper
        elevation={3}
        component={"div"}
        sx={{
          padding: "3rem",
          width: "25rem",
          height: "20rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          position: "relative",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            aria-label="basic tabs example"
          >
            <Tab label="Login" value={0} />
            <Tab label="Registration" value={1} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <LoginForm />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <RegistrationForm />
        </TabPanel>
      </Paper>
    </Box>
  );
};
