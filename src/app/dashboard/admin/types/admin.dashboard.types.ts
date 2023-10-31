// K is optional, in case of initialValues are different from what we send to the server.
// for e.g: we get AIModel from the server (with tags & videos included) and on form submit we send AI from zod validation.
export interface FormProps<PrismaT, ZodT = PrismaT> {
  initialValues?: PrismaT;
  actionFn: (data: ZodT, id?: string) => Promise<PrismaT>;
}
