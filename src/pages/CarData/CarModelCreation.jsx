import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Flex,
  Portal,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  items: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      logo: z
        .any()
        .refine((files) => files instanceof FileList && files.length > 0, {
          message: "Logo is required",
        })
        .optional(),
    })
  ),
});

const CarModelCreation = ({ title }) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { items: [{ name: "", logo: undefined }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data) => {
    console.log("CarBrandCreation:", data);
    const formData = new FormData();
    data.items.forEach((item) => {
      formData.append("name[]", item.name);
      if (item.logo?.[0]) {
        formData.append("logo[]", item.logo[0]); // single file
      }
    });
  };

  return (
    <Dialog.Root lazyMount open={true} key="md" size="md" placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form
                id="brand-form"
                onSubmit={handleSubmit(onSubmit)}
                className="max-h-[70vh] overflow-y-scroll scrollbar-thin
                         scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full
                        hover:scrollbar-thumb-gray-500 scrollbar-track-gray-100"
              >
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    style={{ marginBottom: "20px" }}
                    className="border border-black py-8 pt-6 px-6 rounded-xl shadow-md shadow-gray-300"
                  >
                    <Box mb="20px">
                      <label className="text-black text-[16px] font-semibold">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        {...register(`items.${index}.name`)}
                        className="w-full border rounded-lg px-3 py-2 mt-2 outline-none border-[rgba(91, 120, 124, 1)]"
                      />
                      {errors.items?.[index]?.name && (
                        <p className="text-red-500 text-sm">
                          {errors.items[index].name?.message}
                        </p>
                      )}
                    </Box>

                    <Box>
                      <label className="text-black text-[16px] font-semibold">
                        Logo
                      </label>
                      <input
                        type="file"
                        {...register(`items.${index}.logo`)}
                        className="w-full border rounded-lg px-3 py-3 mt-2 outline-none border-[rgba(91, 120, 124, 1)]"
                      />
                      {errors.items?.[index]?.logo && (
                        <p className="text-red-500 text-sm">
                          {errors.items[index].logo?.message}
                        </p>
                      )}
                    </Box>
                    <Flex justifyContent="end">
                      <Button
                        type="button"
                        mt="15px"
                        size="xs"
                        bg="red"
                        display={index === 0 ? "none" : "block"}
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  </div>
                ))}
              </form>
            </Dialog.Body>
            <Dialog.Footer justifyContent="space-between">
              <Button
                type="button"
                size="sm"
                variant="surface"
                onClick={() => append({ name: "", logo: undefined })}
              >
                Add More
              </Button>
              <Flex gap="10px">
                <Dialog.ActionTrigger asChild>
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button
                  type="submit"
                  form="brand-form"
                  bg="var(--gradient-background)"
                  size="sm"
                >
                  Submit
                </Button>
              </Flex>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CarModelCreation;
