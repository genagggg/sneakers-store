import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IOptions, IShipingFields } from "../app.interface";
import ReactSelect from "react-select";
const options: IOptions[] = [
  {
    value: "russia",
    label: "Russia",
  },
  {
    value: "china",
    label: "China",
  },
  {
    value: "usa",
    label: "USA",
  },
  {
    value: "new-zeeland",
    label: "New Zeeland",
  },
];

const getValue = (value: string) =>
  value ? options.find((option) => option.value === value) : "";

const FormUser: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
  } = useForm<IShipingFields>({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<IShipingFields> = (data) => {
    alert(`You name ${data.name}, you email ${data.email}`);
    console.log(data);
    reset();
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Name is required field" })}
          type="text"
          placeholder="Name"
        />
        {errors?.name && (
          <div style={{ color: "red" }}>{errors.name.message}</div>
        )}
        <input
          {...register("email", {
            required: "Email is required field",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
              message: "Please enter valid email!",
            },
          })}
          type="text"
          placeholder="Email"
        />
        {errors?.email && (
          <div style={{ color: "red" }}>{errors.email.message}</div>
        )}

        <Controller
          control={control}
          name="address.country"
          rules = {{
            required: 'Country is require!'
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <ReactSelect
                classNamePrefix="custom-select"
                placeholder="Countries"
                options={options}
                value={getValue(value)}
                onChange={(newValue) => onChange((newValue as IOptions).value)}
              />
              {error && <div style={{ color: "red" }}>{error.message}</div>}
            </div>
          )}
        />

        <div>
          <button>Send</button>
        </div>
      </form>
      <div>
        <button
          onClick={() => {
            setValue("name", "Max");
            setValue("email", "test@test.ru");
          }}
        >
          Fill data
        </button>
      </div>
    </div>
  );
};

export default FormUser;
