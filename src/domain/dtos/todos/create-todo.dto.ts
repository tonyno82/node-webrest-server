

export class CreateTodoDto {
    constructor(
        public readonly text: string,
    ){}


    static create( props: {[key:string]: any} ): [string?, CreateTodoDto?] {

        const { text } = props;

        if ( !text || text.length === 0) return ['text property is required', undefined]

        return [undefined, new CreateTodoDto(text)]
    }
}