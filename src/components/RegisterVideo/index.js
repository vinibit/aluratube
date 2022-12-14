import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

function generateThumb(value) {          
    const matchedArr = value.match(/v=([\w-]*)/);
    if (!matchedArr) return '';
    const id = matchedArr[1];
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;    
}

function useForm ({ initalValues }) {

    const [values, setValues] = React.useState(initalValues);
       
    return {
        values,
        handleChange: (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setValues({
                ...values,
                [name]: value,
                thumb: name == 'url' ? generateThumb(value) : values.thumb
            })
        },
        clear: () => setValues({})
    };
}

const PROCECT_URL = "https://gresnnouummwjfiopjww.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZXNubm91dW1td2pmaW9wand3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNjM1MTMsImV4cCI6MTk4MzgzOTUxM30.qOFQqhCkwgVgsrbF_WOr5fEbHnNwdIEo4-Bri4dId58";
const supabase = createClient(PROCECT_URL, PUBLIC_KEY);

export default function RegisterVideo() {

    const form = useForm({
        initalValues: {titulo: '', url: '', thumb: ''}
    });
    const [visible, setVisible] = React.useState(false);
    
    const listTypes = [];
    listTypes[1] = "Jogos"; 
    listTypes[2] = "Música"; 
    listTypes[3] = "Tecnologia"; 

    return (
        <StyledRegisterVideo>
            <button type="button" className="add-video" onClick={() => setVisible(true)} >
                +
            </button>
            {visible && 
                (<form onSubmit={(e) => {
                    e.preventDefault();                    

                    supabase.from("video").insert({
                        title: form.values.titulo,
                        url: form.values.url,
                        thumb: generateThumb(form.values.url),
                        playlist_id: form.values.playlist_id
                    })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err);
                    });

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
                        <img src={form.values.thumb} />
                        <select name="playlist_id"                            
                            value={form.values.playlist_id}
                            onChange={form.handleChange} >
                                <option value="" selected disabled>Escolha uma lista</option>
                                {
                                    listTypes.map((type, id) => {
                                        return ( <option value={id}>{type}</option> )
                                    })
                                }                               
                        </select>                        
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>                
            </form>)}
        </StyledRegisterVideo>
    )    
}
