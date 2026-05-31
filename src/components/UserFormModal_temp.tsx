import { UserFormValues, UserItem } from "@/types/user";

interface Props {
    open: boolean;
    initialValues?: UserItem;
    onCancel: () => void;
    onSubmit: (
        values: UserFormValues,
    ) => Promise<void>;
}


