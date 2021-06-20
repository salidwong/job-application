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
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
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
  selectApplicationInfo,
  submitApplication,
} from "./applicationInfoSlice";
import { format } from "date-fns";

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
    warningMessage: { paddingLeft: "10px", fontSize: "12px" },
  };
});

const pleaseSelect = {
  id: "id-00001",
  value: "empty",
  label: "please select",
};

const titles = [
  { ...pleaseSelect },
  { id: "id-00002", value: "mr", label: "Mr." },
  { id: "id-00003", value: "mrs", label: "Mrs." },
];

export const nationalities = [
  { ...pleaseSelect },
  { id: "id-00004", value: "th", label: "Thai" },
  { id: "id-00005", value: "en", label: "English" },
];

export const genders = [
  { ...pleaseSelect },
  { id: "id-00006", value: "male", label: "Male" },
  { id: "id-00007", value: "female", label: "Female" },
  { id: "id-00008", value: "unisex", label: "UniSex" },
];

export const countryCodes = [
  { id: "id-00009", value: "th", label: "+66" },
  { id: "id-00010", value: "etc", label: "+00" },
];

const validateThaiCitizenID = (id) => {
  if (id === "") return true;
  if (id == null || id.length !== 13 || !/^[0-9]\d+$/.test(id)) {
    return false;
  }
  let i;
  let sum = 0;
  for (i = 0, sum = 0; i < 12; i++) {
    sum += parseInt(id.charAt(i)) * (13 - i);
  }
  const check = (11 - (sum % 11)) % 10;
  if (check === parseInt(id.charAt(12))) {
    return true;
  }
  return false;
};

const validateField = (info) => {
  const { title, firstName, lastName, phoneNo, salary } = info;
  console.log("info", info);

  return (
    title !== "empty" && !!firstName && !!lastName && !!phoneNo && !!salary
  );
};

export const ApplicationInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const applicationInfo = useSelector(selectApplicationInfo);
  const title = useSelector(selectTitle);
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const formatDateOfBirth = useSelector(selectDateOfBirth);
  const dateOfBirth = new Date(formatDateOfBirth);
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
    const pattern = /^[\u0E00-\u0E7Fa-zA-Z]*$/;
    if (!pattern.test(value)) return;
    dispatch(setFirstName({ value }));
  };

  const handleLastNameChange = (e) => {
    const { target } = e;
    const { value } = target;
    const pattern = /^[\u0E00-\u0E7Fa-zA-Z]*$/;
    if (!pattern.test(value)) return;

    dispatch(setLastName({ value }));
  };

  const handleDateOfBirthChange = (value) => {
    const formatDate = format(value, "yyyy/MM/dd");
    dispatch(setDateOfBirth({ value: formatDate }));
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

  const handleSubmit = () => {
    const isValid = validateField(applicationInfo);
    if (!isValid) return;

    dispatch(submitApplication(applicationInfo));
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
                <FormControl
                  error={title === "empty"}
                  className={classes.formControl}
                  fullWidth
                >
                  <Select value={title} onChange={handleTitleChange}>
                    {titles.map((t) => (
                      <MenuItem key={t.id} value={t.value}>
                        {t.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {title === "empty" && (
                  <Typography
                    color="error"
                    variant="body1"
                    className={classes.warningMessage}
                  >
                    field is required
                  </Typography>
                )}
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
                  error={!firstName}
                  className={classes.textField}
                  fullWidth
                  value={firstName}
                  onChange={handleFirstNameChange}
                  helperText={!firstName && "field is required"}
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
                  error={!lastName}
                  className={classes.textField}
                  fullWidth
                  value={lastName}
                  onChange={handleLastNameChange}
                  helperText={!lastName && "field is required"}
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
                  <DatePicker
                    className={classes.textField}
                    disableFuture
                    openTo="year"
                    format="dd/MM/yyyy"
                    views={["year", "month", "date"]}
                    value={dateOfBirth}
                    onChange={handleDateOfBirthChange}
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
                      <MenuItem key={t.id} value={t.value}>
                        {t.label}
                      </MenuItem>
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
                  error={!validateThaiCitizenID(citizenID)}
                  className={classes.textField}
                  customInput={TextField}
                  value={citizenID}
                  format="#-####-#####-##-#"
                  onValueChange={handleCitizenIdChange}
                />
                {!validateThaiCitizenID(citizenID) && (
                  <Typography
                    variant="body1"
                    color="error"
                    className={classes.warningMessage}
                  >
                    Invalid CitizenID
                  </Typography>
                )}
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
                        <MenuItem key={t.id} value={t.value}>
                          {t.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={7}>
                  <NumberFormat
                    error={!phoneNo}
                    className={classes.textField}
                    customInput={TextField}
                    value={phoneNo}
                    format="#-####-####"
                    onValueChange={handlePhoneNoChange}
                  />
                  {!phoneNo && (
                    <Typography
                      color="error"
                      variant="body1"
                      className={classes.warningMessage}
                    >
                      field is required
                    </Typography>
                  )}
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
                  className={classes.textField}
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
                  error={!salary}
                  className={classes.textField}
                  customInput={TextField}
                  thousandSeparator
                  value={salary}
                  onValueChange={handleSalaryChange}
                />
                {!salary && (
                  <Typography
                    color="error"
                    variant="body1"
                    className={classes.warningMessage}
                  >
                    field is required
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};
