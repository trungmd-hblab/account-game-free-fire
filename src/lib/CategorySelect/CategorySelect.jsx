import { useGetCategories } from "@/api/category";
import { TYPE_CATE_FREE_FIRE_ACCOUNT } from "@/constants/common";
import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const CategorySelect = ({ control, name, rules, type, defaultValue, errors }) => {
    const [dataToSelect, setDataToSelect] = useState([])
  const { data: listCate, isLoading } = useGetCategories({
    keyword: "",
    page: 1,
    limit: 5000,
    types:type
});

  useEffect(() => {
    if(listCate){
        const newData = listCate?.result?.items?.map((item)=> {
            return {
                label: item?.title,
                value: item?._id
            }
        })
        setDataToSelect(newData)
    }
    // if (!defaultValue && listCate && listCate.length > 0) {
    //   control.setValue(name, listCate[0].id);
    // }
  }, [listCate, defaultValue, control, name]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Select
          label="Danh mục"
          placeholder="Chọn danh mục"
          data={dataToSelect}
          {...field}
          error={errors[name] && errors[name].message}
        />
      )}
    />
  );
};

export default CategorySelect;
