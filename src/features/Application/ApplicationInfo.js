import {
  Paper,
  Container,
  Typography,
  Grid,
  FormControl,
  TextField,
  MenuItem,
  Select,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFirstName,
  selectTitle,
  setTitle,
  setFirstName,
  selectLastName,
  setLastName,
  selectDateOfBirth,
  setDateOfBirth,
  selectNationality,
  setNationality,
  selectCitizenID,
  setCitizenID,
  selectGender,
  setGender,
  selectCountryCode,
  setCountryCode,
  selectPhoneNo,
  setPhoneNo,
  selectPassportNo,
  setPassportNo,
  selectSalary,
  setSalary,
} from "./applicationInfoSlice";

const useStyles = makeStyles(() => {
  return {
    paper: {
      marginTop: "100px",
    },
    row: {
      marginTop: "20px",
      marginBottom: "20px",
    },
    formControl: {
      marginLeft: "10px",
      "& .MuiInputBase-root.MuiInput-root": {
        width: "120px",
      },
    },

    textField: {
      paddingLeft: "10px",
    },
  };
});

const pleaseSelect = {
  value: "empty",
  label: "please select",
};

const titles = [
  { ...pleaseSelect },
  { value: "mr", label: "Mr." },
  { value: "mrs", label: "Mrs." },
];

const nationalities = [
  { ...pleaseSelect },
  { value: "th", label: "Thai" },
  { value: "en", label: "English" },
];

const countryCodes = [
  { value: "th", label: "+66" },
  { value: "etc", label: "+00" },
];

export const ApplicationInfo = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const title = useSelector(selectTitle);
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const dateOfBirth = useSelector(selectDateOfBirth);
  const nationality = useSelector(selectNationality);
  const citizenID = useSelector(selectCitizenID);
  const gender = useSelector(selectGender);
  const countryCode = useSelector(selectCountryCode);
  const phoneNo = useSelector(selectPhoneNo);
  const passportNo = useSelector(selectPassportNo);
  const salary = useSelector(selectSalary);

  const handleTitleChange = (e) => {
    const { target } = e;
    const { value } = target;

    dispatch(setTitle({ value }));
  };

  const handleFirstNameChange = (e) => {
    const { target } = e;
    const { value } = target;

    dispatch(setFirstName({ value }));
  };

  const handleLastNameChange = (e) => {
    const { target } = e;
    const { value } = target;

    dispatch(setLastName({ value }));
  };

  const handleDateOfBirthChange = (value) => {
    dispatch(setDateOfBirth({ value }));
  };

  const handleNationalityChange = (e) => {
    const { target } = e;
    const { value } = target;

    dispatch(setNationality({ value }));
  };

  const handleCitizenIdChange = (values) => {
    const { value } = values;

    dispatch(setCitizenID({ value }));
  };

  const handleGenderChange = (e) => {
    const { target } = e;
    const { value } = target;

    dispatch(setGender({ value }));
  };

  const handleCountryCodeChange = (e) => {
    const { target } = e;
    const { value } = target;

    dispatch(setCountryCode({ value }));
  };

  const handlePhoneNoChange = (values) => {
    const { value } = values;

    dispatch(setPhoneNo({ value }));
  };

  const handlePassportNoChange = (e) => {
    const { target } = e;
    const { value } = target;

    dispatch(setPassportNo({ value }));
  };

  const handleSalaryChange = (values) => {
    const { value } = values;

    dispatch(setSalary({ value }));
  };

  return (
    <Paper variant="outlined" className={classes.paper}>
      <Container>
        {/* row 1 */}
        <Grid container className={classes.row}>
          <Grid item md={4}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography>Title:</Typography>
              </Grid>
              <Grid item>
                <Typography color="error">*</Typography>
              </Grid>
              <Grid item>
                <FormControl className={classes.formControl} fullWidth>
                  <Select value={title} onChange={handleTitleChange}>
                    {titles.map((t) => (
                      <MenuItem value={t.value}>{t.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography>Firstname:</Typography>
              </Grid>
              <Grid item>
                <Typography color="error">*</Typography>
              </Grid>
              <Grid item md={8}>
                <TextField
                  className={classes.textField}
                  fullWidth
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography>Lastname:</Typography>
              </Grid>
              <Grid item>
                <Typography color="error">*</Typography>
              </Grid>
              <Grid item md={8}>
                <TextField
                  className={classes.textField}
                  fullWidth
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* row 2 */}
        <Grid container className={classes.row}>
          <Grid item md={4}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography>Birthday:</Typography>
              </Grid>
              <Grid item>
                <Typography color="error">*</Typography>
              </Grid>

              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.textField}
                    variant="inline"
                    format="MM/dd/yyyy"
                    value={dateOfBirth}
                    onChange={handleDateOfBirthChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography>Nationality:</Typography>
              </Grid>

              <Grid item>
                <FormControl className={classes.formControl} fullWidth>
                  <Select
                    value={nationality}
                    onChange={handleNationalityChange}
                  >
                    {nationalities.map((t) => (
                      <MenuItem value={t.value}>{t.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography>CitizenID:</Typography>
              </Grid>

              <Grid item>
                <NumberFormat
                  className={classes.textField}
                  customInput={TextField}
                  value={citizenID}
                  format="#-####-#####-##-#"
                  onValueChange={handleCitizenIdChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* row 3 */}
        <Grid container className={classes.row}>
          <Grid item md={4}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography>Gender:</Typography>
              </Grid>

              <Grid item>
                <FormControl component="fieldset">
                  <RadioGroup
                    className={classes.textField}
                    row
                    aria-label="gender"
                    name="gender"
                    value={gender}
                    onChange={handleGenderChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />

                    <FormControlLabel
                      value="unisex"
                      control={<Radio />}
                      label="UniSex"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography>Mobile Phone:</Typography>
              </Grid>
              <Grid item>
                <Typography color="error">*</Typography>
              </Grid>

              <Grid container md={8}>
                <Grid item>
                  <FormControl style={{ paddingLeft: "10px" }}>
                    <Select
                      value={countryCode}
                      onChange={handleCountryCodeChange}
                    >
                      {countryCodes.map((t) => (
                        <MenuItem value={t.value}>{t.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={7}>
                  <NumberFormat
                    className={classes.textField}
                    customInput={TextField}
                    value={phoneNo}
                    format="#-####-####"
                    onValueChange={handlePhoneNoChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography>Passport No:</Typography>
              </Grid>

              <Grid item>
                <TextField
                  value={passportNo}
                  onChange={handlePassportNoChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* row 4 */}
        <Grid container className={classes.row}>
          <Grid item md={4}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography>Expected Salary:</Typography>
              </Grid>
              <Grid item>
                <Typography color="error">*</Typography>
              </Grid>

              <Grid item>
                <NumberFormat
                  className={classes.textField}
                  customInput={TextField}
                  thousandSeparator
                  value={salary}
                  //   format="#-####-#####-##-#"
                  onValueChange={handleSalaryChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" onClick={() => null}>
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};
