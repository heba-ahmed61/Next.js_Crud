"use client";
import { addPost , editPost} from "@/app/actions/serverActions";
import { useFormik } from "formik";
import * as yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import './PostForm.css'
import { useEffect, useState } from "react";
import BackBtn from "../BackBtn/BackBtn";
const PostForm = ({itemData}) => {
  const router = useRouter();
  const [lastPageNum, setLastPageNum] = useState( localStorage.getItem('lastPage'))
  useEffect(() => {
   setLastPageNum( localStorage.getItem('lastPage'))
  },[ localStorage.getItem('lastPage')])
  // Form Validation Starts
  const validation = yup.object().shape({
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
  });
  // Form Validation Ends

  // Form Submit Starts
  const onSubmit = async (values) => {
    try {
      const data = {
        userId: 1,
        id: new Date(),
        title:values?.title ,
        body:values?.description
      ,
    }
    if (itemData){
      const response = await editPost(data,itemData?.id)
      router.back()
    }else{
      const response = await addPost(data)
      router.push(`/?page=${lastPageNum}`)
    } 
   
    } catch (error) {
      console.log(error)
    }
  };
  // Form Submit Ends

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues: {
      title: itemData?.title ? itemData?.title : '',
      description: itemData?.body ? itemData?.body : '',
    },
    validationSchema: validation,
    onSubmit: onSubmit,
  });
  return (
    <div className="post_form_wrapper"> 
    <h1 className="form_title">
      {itemData ? "Edit Post": "Add Post"}
    </h1>
    <form onSubmit={handleSubmit}>
      <div>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          value={values?.title}
          placeholder="Title"
        />
        {errors.title && touched.title && <p className="form_error">{errors?.title}</p>}
      </div>
      <div>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={values?.description}
          placeholder="Description"
        />
        {errors.description && touched.description && <p className="form_error">{errors?.description}</p>}
      </div>
      <div className="submit_btn">
      <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  );
};
export default PostForm;
