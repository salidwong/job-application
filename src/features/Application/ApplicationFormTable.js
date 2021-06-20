import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Checkbox,
  Paper,
  Grid,
  Typography,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import NumberFormat from "react-number-format";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteApplicationInfo,
  deleteMultiApplicationInfo,
  selectApplicationForms,
  selectEditIndex,
  selectForms,
  selectIsCheckedAll,
  setEditIndex,
  setIsChecked,
  setIsCheckedAll,
  updateFieldByIndex,
} from "./applicationFormSlice";
import { countryCodes, genders, nationalities } from "./ApplicationInfo";

const EditField = ({ prop, rowIdx, forms, row }) => {
  const dispatch = useDispatch();

  switch (prop) {
    case "firstName":
    case "lastName": {
      return (
        <TextField
          name={prop}
          onChange={(e) =>
            dispatch(
              updateFieldByIndex({
                value: e.target.value,
                name: prop,
                index: rowIdx,
                applicationForms: forms,
              })
            )
          }
          value={row[prop].value}
        />
      );
    }
    case "gender": {
      return (
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="gender"
            name="gender"
            value={row[prop].key}
            onChange={(e) =>
              dispatch(
                updateFieldByIndex({
                  value: e.target.value,
                  name: prop,
                  index: rowIdx,
                  applicationForms: forms,
                })
              )
            }
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
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
      );
    }
    case "countryCode": {
      return (
        <Grid container>
          <Grid item>
            <FormControl>
              <Select
                value={row[prop].key}
                onChange={(e) =>
                  dispatch(
                    updateFieldByIndex({
                      value: e.target.value,
                      name: prop,
                      index: rowIdx,
                      applicationForms: forms,
                    })
                  )
                }
              >
                {countryCodes.map((t) => (
                  <MenuItem key={t.id} value={t.value}>
                    {t.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <NumberFormat
              customInput={TextField}
              value={row["phoneNo"].value}
              format="#-####-####"
              onValueChange={(values) =>
                dispatch(
                  updateFieldByIndex({
                    value: values.value,
                    name: "phoneNo",
                    index: rowIdx,
                    applicationForms: forms,
                  })
                )
              }
            />
          </Grid>
        </Grid>
      );
    }

    // case "phoneNo": {
    //   return (
    //     <NumberFormat
    //       customInput={TextField}
    //       value={""}
    //       format="#-####-####"
    //       onValueChange={() => null}
    //     />
    //   );
    // }
    case "nationality": {
      return (
        <FormControl fullWidth>
          <Select
            value={row[prop].key}
            onChange={(e) =>
              dispatch(
                updateFieldByIndex({
                  value: e.target.value,
                  name: prop,
                  index: rowIdx,
                  applicationForms: forms,
                })
              )
            }
          >
            {nationalities.map((t) => (
              <MenuItem key={t.id} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    default:
      return <></>;
  }
};

const Row = ({ x, i, header }) => {
  const dispatch = useDispatch();
  const forms = useSelector(selectForms);
  const editIndex = useSelector(selectEditIndex);
  const applicationInfoByIndex = forms[i];
  const isChecked = applicationInfoByIndex.isChecked;
  const currentlyEditing = editIndex === i;

  return (
    <TableRow key={`tr-${i}`}>
      <TableCell>
        <Checkbox
          checked={isChecked}
          onChange={() =>
            dispatch(setIsChecked({ index: i, applicationForms: forms }))
          }
        />
      </TableCell>
      {header.map((y, k) => {
        return (
          <TableCell key={`trc-${k}`}>
            {currentlyEditing ? (
              <EditField prop={y.prop} rowIdx={i} forms={forms} row={x} />
            ) : (
              <>
                {`${x[y.prop].value} `}
                {y.prop === "countryCode" && ` ${x["phoneNo"].value}`}
              </>
            )}
          </TableCell>
        );
      })}
      <TableCell>
        {currentlyEditing ? (
          <Button onClick={() => dispatch(setEditIndex({ index: -1 }))}>
            OK
          </Button>
        ) : (
          <Button onClick={() => dispatch(setEditIndex({ index: i }))}>
            EDIT
          </Button>
        )}

        <Button
          onClick={() =>
            dispatch(
              deleteApplicationInfo({ index: i, applicationForms: forms })
            )
          }
        >
          DELETE
        </Button>
      </TableCell>
    </TableRow>
  );
};

const header = [
  {
    name: "NAME",
    prop: "firstName",
  },
  {
    lastName: "",
    prop: "lastName",
  },
  {
    name: "GENDER",
    prop: "gender",
  },
  {
    name: "MOBILEPHONE",
    prop: "countryCode",
  },
  // {
  //   name: "",
  //   prop: "phoneNo",
  // },
  {
    name: "NATIONALITY",
    prop: "nationality",
  },
];

export const ApplicationFormTable = () => {
  const dispatch = useDispatch();
  const rootApplicationForms = useSelector(selectApplicationForms);
  const forms = useSelector(selectForms);
  const isCheckedAll = useSelector(selectIsCheckedAll);

  const formTable = forms.map((f) => {
    const { label: genderLabel } = genders.find((g) => g.value === f.gender);
    const { label: countryCodeLabel } = countryCodes.find(
      (c) => c.value === f.countryCode
    );
    const { label: nationalityLabel } = nationalities.find(
      (n) => n.value === f.nationality
    );

    console.log("countryCodeLabel", countryCodeLabel);

    return {
      firstName: { key: f.firstName, value: f.firstName },
      lastName: { key: f.lastName, value: f.lastName },
      gender: { key: f.gender, value: genderLabel },
      countryCode: { key: f.countryCode, value: countryCodeLabel },
      phoneNo: { key: f.phoneNo, value: f.phoneNo },
      nationality: { key: f.nationality, value: nationalityLabel },
    };
  });

  return (
    <Paper style={{ marginTop: "80px" }}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Checkbox
            checked={isCheckedAll}
            onChange={() => dispatch(setIsCheckedAll({ rootApplicationForms }))}
          />
        </Grid>
        <Grid item>
          <Typography> Select All</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() =>
              dispatch(deleteMultiApplicationInfo({ applicationForms: forms }))
            }
          >
            DELETE
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              {header.map((x, i) => (
                <TableCell key={`thc-${i}`}>{x.name}</TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            {formTable.map((x, i) => (
              <Row key={`row-table-${i}`} x={x} i={i} header={header} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
