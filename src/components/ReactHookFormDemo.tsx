// src/pages/UserFormPage.tsx

import { useForm, Controller, useFieldArray, Resolver } from "react-hook-form";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./ReactHookFormDemo.module.scss";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const userSchema = z.object({
    username: z.string().trim().min(3, {
        error: "至少 3 個字",
    }),

    email: z.email({
        error: "Email 格式錯誤",
    }),

    password: z.string().min(6, {
        error: "密碼至少 6 碼",
    }),
    age: z.coerce.number().min(18, {
        error: "必須滿 18 歲",
    }),

    gender: z.enum(["male", "female"]),

    hobbies: z.array(z.string()).min(1, {
        error: "至少選一項",
    }),

    bio: z.string().max(200, {
        error: "最多 200 字",
    }).optional(),
    // refine 用來自訂驗證邏輯
    isAccept: z.boolean().refine((data) => data === true, {
        error: "請同意條款",
    }),

    addresses: z.array(
        z.object({
            city: z.string().min(1, {
                error: "請輸入城市",
            }),

            district: z.string().min(1, {
                error: "請輸入區域",
            }),
        })
    ),
});

// 自動生成的 TypeScript 型別
type FormData = z.infer<typeof userSchema>;

export default function ReactHookFormDemo() {
    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<FormData>({
        resolver: zodResolver(userSchema) as Resolver<FormData>,
        defaultValues: {
            username: "",
            email: "",
            password: "",
            age: undefined,
            gender: "male",
            hobbies: [],
            bio: "",
            isAccept: false,
            addresses: [{ city: "", district: "" }],
        },
        mode: "onBlur", //
    });

    // 動態欄位
    const { fields, append, remove } = useFieldArray({
        control,
        name: "addresses",
    });

    // watch
    const selectedGender = watch("gender");

    const onSubmit = async (data: FormData) => {
        console.log("submit data =>", data);

        // 模擬 API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        alert("送出成功");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>React Hook Form 範例</h1>

            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* username */}
                <div className={styles.formGroup}>
                    <label>Username</label>
                    <input
                        {...register("username")}
                        placeholder="請輸入帳號"
                    />
                    <p className={styles.error}>
                        {errors.username?.message}
                    </p>
                </div>

                {/* email */}
                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                        {...register("email")}
                        placeholder="請輸入 Email"
                    />
                    <p className={styles.error}>
                        {errors.email?.message}
                    </p>
                </div>

                {/* password */}
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        {...register("password")}
                    />
                    <p className={styles.error}>
                        {errors.password?.message}
                    </p>
                </div>

                {/* age */}
                <div className={styles.formGroup}>
                    <label>Age</label>
                    <input
                        type="number"
                        {...register("age")}
                    />
                    <p className={styles.error}>
                        {errors.age?.message}
                    </p>
                </div>

                {/* radio */}
                <div className={styles.formGroup}>
                    <label>Gender</label>

                    <div className={styles.inline}>
                        <label>
                            <input
                                type="radio"
                                value="male"
                                {...register("gender")}
                            />
                            Male
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="female"
                                {...register("gender")}
                            />
                            Female
                        </label>
                    </div>

                    <small>
                        當前性別：
                        {selectedGender}
                    </small>
                </div>

                {/* checkbox */}
                <div className={styles.formGroup}>
                    <label>Hobbies</label>

                    <div className={styles.inline}>
                        <label>
                            <input
                                type="checkbox"
                                value="coding"
                                {...register("hobbies")}
                            />
                            Coding
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                value="music"
                                {...register("hobbies")}
                            />
                            Music
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                value="movie"
                                {...register("hobbies")}
                            />
                            Movie
                        </label>
                    </div>

                    <p className={styles.error}>
                        {errors.hobbies?.message}
                    </p>
                </div>

                {/* textarea */}
                <div className={styles.formGroup}>
                    <label>Bio</label>

                    <textarea
                        rows={4}
                        {...register("bio")}
                    />


                    <p className={styles.error}>
                        {errors.bio?.message}
                    </p>
                </div>

                {/* Controller */}
                <div className={styles.formGroup}>
                    <label>Custom Input (Controller)</label>

                    <Controller
                        control={control}
                        name="username"
                        render={({ field }) => (
                            <Input
                                prefix={<UserOutlined />}
                                {...field}
                                placeholder="Controller Input"
                            />
                        )}
                    />
                </div>

                {/* 動態欄位 */}
                <div className={styles.formGroup}>
                    <label>Addresses</label>

                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className={styles.addressRow}
                        >
                            <input
                                placeholder="City"
                                {...register(`addresses.${index}.city`)}
                            />

                            <input
                                placeholder="District"
                                {...register(
                                    `addresses.${index}.district`
                                )}
                            />

                            <button
                                type="button"
                                onClick={() => remove(index)}
                            >
                                刪除
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() =>
                            append({
                                city: "",
                                district: "",
                            })
                        }
                    >
                        新增地址
                    </button>
                </div>

                {/* checkbox */}
                <div className={styles.formGroup}>
                    <label className={styles.inline}>
                        <input
                            type="checkbox"
                            {...register("isAccept")}
                        />
                        我同意條款
                    </label>

                    <p className={styles.error}>
                        {errors.isAccept?.message}
                    </p>
                </div>

                {/* 操作按鈕 */}
                <div className={styles.buttonGroup}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "送出中..." : "Submit"}
                    </button>

                    <button
                        type="button"
                        onClick={() => reset()}
                    >
                        Reset
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setValue("username", "admin")
                        }
                    >
                        set amdin for username
                    </button>
                </div>

                <div className={styles.status}>
                    dirty state:
                    {isDirty ? "已修改" : "未修改"}
                </div>
            </form>
        </div>
    );
}