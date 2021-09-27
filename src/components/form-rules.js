import {
  Typography,
  Grid,
  Paper,
  Button,
  Modal,
  DialogContent,
} from "@material-ui/core";
import React, { useState } from "react";
import RuleController from "./rule-controller";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const FormRules = ({ form }) => {
  const [rules, setRules] = useState(form.rules);
  const [currentRule, setCurrentRule] = useState(null);
  const [mode, setMode] = useState("add");
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  const handleModal = () => {
    setMode("add");
    setModalOpen(true);
  };

  const handleModalSubmit = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <Grid container>
      <Typography variant="h1">Rules for {form.name.toLowerCase()}</Typography>
      {rules && rules.length > 0 ? (
        <Paper>
          <div className="rulesButtonsContainer">
            <Button onClick={(e) => handleModal}>Add rule</Button>
          </div>
        </Paper>
      ) : (
        <Paper>
          <p>There are no rules set up for this form.</p>
          <Button onClick={(e) => handleModal}>Add rule</Button>
        </Paper>
      )}
      <Modal
        open={modalOpen}
        onClose={(e) => handleModalSubmit(false)}
        className="modalWindow"
      >
        {mode && mode === "add" ? (
          <DialogContent className={classes.root}>
            <RuleController
              onFormSubmit={handleModal}
              onCancel={handleCancel}
              rule={{
                label: null,
                conditions: null,
                action: null,
                enabled: false,
              }}
              ruleIndex={rules.length}
            />
          </DialogContent>
        ) : (
          <DialogContent className={classes.root}>
            <RuleController
              onFormSubmit={handleModal}
              edit={true}
              onCancel={handleCancel}
              rule={currentRule !== null ? rules[currentRule] : null}
              ruleIndex={currentRule}
            />
          </DialogContent>
        )}
      </Modal>
    </Grid>
  );
};

export default FormRules;
