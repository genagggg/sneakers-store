import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormShipping {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
}

const ShippingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormShipping>();

  const onSubmit: SubmitHandler<IFormShipping> = (data) =>{
    console.log(data)
  }
  return (
    <div>
      <h1>Enter you shipping info</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 12 }}>
          <input {...register("firstName", {required: true, maxLength: 2})} placeholder="your name" />
        </div>
        <button>Отправка</button>
      </form>
    </div>
  );
};

export default ShippingForm;
