// K is optional, in case of initialValues are different from what we send to the server.
// for e.g: we get AIModel from the server (with tags & videos included) and on form submit we send AI from zod validation.
export interface FormProps<T, K = T> {
  initialValues?: T;
  actionFn: (data: K, id?: string) => Promise<T>;
}
