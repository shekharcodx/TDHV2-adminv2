import { Field, Input } from "@chakra-ui/react";

const FilterInput = ({ label, placeholder, value, setValue }) => {
  return (
    <Field.Root mt={{ base: "20px", md: "0px" }}>
      <Field.Label>{label}</Field.Label>
      <Input
        size="xs"
        outline="none"
        minW="220px"
        placeholder={placeholder}
        variant="outline"
        value={value}
        onInput={(e) => setValue(e.currentTarget.value)}
      />
    </Field.Root>
  );
};

export default FilterInput;
