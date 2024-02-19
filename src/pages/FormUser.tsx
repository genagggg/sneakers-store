import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IShipingFields } from "../app.interface";

const FormUser: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField
  } = useForm<IShipingFields>({
    defaultValues:{
        email: 'rtest@test.ru',
    }
  });
  const onSubmit: SubmitHandler<IShipingFields> = (data) => {
    alert(`You name ${data.name}, you email ${data.email}`);
    console.log(data)
    reset()
  };
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
        <div>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
};

export default FormUser;
