export interface IAction {
    topic: string;
    cmd: string;
}

export const Action = (pattern: IAction, additionalPattern?: { [key: string]: string }) => {
    return (target: any, key: PropertyKey, descriptor: TypedPropertyDescriptor<any>) => {
        const orginalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            const thisClass: any = this;

            if (!thisClass.hemera || !thisClass.hemera.instance) {
                const error = `Action service must have hemera property.
HemeraService must have instance getter which returns Hemera instance.
                `;
                console.log('\x1b[31m', error);
                throw new Error(error);
            }

            if (!thisClass.validator || !thisClass.validator.schema) {
                const error = `Action service must have validator property.
ValidateService must have schema method which returns validation.
                `;
                console.log('\x1b[31m', error);
                throw new Error(error);
            }

            const hemera: any = thisClass.hemera.instance;

            let patternWithValidation: any = {
                ...pattern,
                data: thisClass.validator.schema,
            };

            if (additionalPattern) {
                patternWithValidation = {
                    ...patternWithValidation,
                    ...additionalPattern,
                };
            }

            const binded = orginalMethod.bind(this);
            hemera.add(patternWithValidation, binded);
            const { data, ...forLog } = patternWithValidation;

            /* istanbul ignore next */
            console.log('\x1b[33m%s\x1b[0m', `Action registed: ${JSON.stringify(forLog)}`);

            return `Action ${JSON.stringify(forLog)} added succesfly`;
        };

        return descriptor;
    };
};
