import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm ({ initalValues }) {    
    const [values, setValues] = React.useState(initalValues);
    const videoIdExp = /v=(\w*)/;

    function generateThumb(name, value) {
        if (name != 'url') return values.thumb;
        
        const id = value.match(videoIdExp)[1];
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }

    return {
        values,
        handleChange: (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setValues({
                ...values,
                [name]: value,
                thumb: generateThumb(name, value)
            })
        },
        clear: () => setValues({})
    };
}

export default function RegisterVideo() {

    const form = useForm({
        initalValues: {titulo: '', url: '', thumb: ''}
    });
    const [visible, setVisible] = React.useState(false);    

    return (
        <StyledRegisterVideo>
            <button type="button" className="add-video" onClick={() => setVisible(true)} >
                +
            </button>
            {visible && 
                (<form onSubmit={(e) => {
                    e.preventDefault();
                    console.log(form.values);

                    setVisible(false);
                    form.clear();
                }}>
                    <div>
                        <button className="close-modal" onClick={() => {
                            form.clear();
                            setVisible(false);
                        }} >
                            X
                        </button>
                        <input name="titulo" 
                            placeholder="Título do vídeo" 
                            value={form.values.titulo}
                            onChange={form.handleChange} />
                        <input name="url"
                            placeholder="Exemplo: https://youtu.be/5FZzjYACrQc" 
                            value={form.values.url} 
                            onChange={form.handleChange} />
                        <input name="thumb" 
                            readOnly={true} 
                            value={form.values.thumb} />
                        <img src={form.values.thumb} />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>                
            </form>)}
        </StyledRegisterVideo>
    )    
}