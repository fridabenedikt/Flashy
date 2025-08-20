import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { Flashcard } from "~/src/types";
import Button from "../Button";
import styles from "./FlashyForm.module.css";
import { SUBJECTS } from "~/src/constants";

export type FormValues = {
  title?: string;
  subjects?: "science" | "mathematics";
  description?: string;
  cards: Flashcard[] | [];
  isPrivate: boolean;
};

type FormProps = {
  type: "edit" | "create";
  onSubmit: (values: FormValues) => void;
  initialValues?: FormValues;
};

const FlashyForm = ({
  type = "create",
  onSubmit,
  initialValues,
}: FormProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const required = (value: any) => (value ? undefined : "Required");

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      initialValues={initialValues}
      render={({
        handleSubmit,
        form: {
          mutators: { push, pop },
        },
      }) => (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.opprett}>
            <h2>{type.toUpperCase()} SET</h2>
          </div>
          <div className={styles.align}>
            <div className={styles.align2}>
              <h2>Name of set</h2>
              <Field
                className={styles.description}
                validate={required}
                name="title"
              >
                {({ input, meta }) => (
                  <div>
                    <input {...input} type="input" placeholder="Name of set" />
                    {meta.error && meta.touched && (
                      <span className={styles.errorMessage}>{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>
            </div>
            <div className={styles.align3}>
              <h2>Subjects</h2>

              <Field
                className={styles.emneknapp}
                name="subject"
                component="select"
              >
                <option>NONE</option>
                {SUBJECTS.map((subject) => (
                  <option value={subject.value}>
                    {subject.value} - {subject.label}
                  </option>
                ))}
              </Field>
            </div>
            <div className={styles.align4}>
              <h2> Make Private</h2>
              <Field
                className={styles.isPrivate}
                name="isPrivate"
                component="input"
                type="checkbox"
                style={{ transform: "scale(3)" }}
              />
            </div>
          </div>

          <h2>Description</h2>
          <Field
            className={styles.description}
            validate={required}
            name="description"
            component="textarea"
            rows={3}
          >
            {({ input, meta }) => (
              <div>
                <input {...input} type="input" placeholder="Description.." />
                {meta.error && meta.touched && (
                  <span className={styles.errorMessage}>{meta.error}</span>
                )}
              </div>
            )}
          </Field>
          <div className={styles.cardContainer}>
            <h2>Cards</h2>
            <FieldArray name="cards">
              {({ fields }) =>
                fields.map((name, index) => (
                  <div key={name} className={styles.card}>
                    <h3>Card {index + 1}</h3>
                    <div className={styles.cardInputs}>
                      <div className={styles.input}>
                        <label>Question</label>
                        <Field name={`${name}.front`} validate={required}>
                          {({ input, meta }) => (
                            <div>
                              <input
                                {...input}
                                type="text"
                                placeholder="Enter question here"
                                className={styles.description}
                              />
                              {meta.error && meta.touched && (
                                <span className={styles.errorMessage}>
                                  {meta.error}
                                </span>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className={styles.input}>
                        <label>Answer</label>
                        <Field name={`${name}.back`} validate={required}>
                          {({ input, meta }) => (
                            <div>
                              <input
                                {...input}
                                type="text"
                                placeholder="Enter answer here"
                                className={styles.description}
                              />
                              {meta.error && meta.touched && (
                                <span className={styles.errorMessage}>
                                  {meta.error}
                                </span>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <div className={styles.input}>
                        <label> Image</label>
                        <Field name={`${name}.frontImage`} component="input" />
                      </div>
                    </div>
                    <FontAwesomeIcon
                      type="button"
                      onClick={() => pop("cards")}
                      icon={faTrash}
                      size="lg"
                    />
                  </div>
                ))
              }
            </FieldArray>
            <Button type="button" onClick={() => push("cards", undefined)}>
              Add Card
            </Button>
          </div>

          <Button className={styles.createset} type="submit">
            {type.charAt(0).toUpperCase() + type.slice(1)} set
          </Button>
        </form>
      )}
    />
  );
};

export default FlashyForm;
