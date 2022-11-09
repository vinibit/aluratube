import React from "react";
import styled from "styled-components";
import config from "../config.json";
import Menu from "../src/components/Menu";
import { CSSReset } from "../src/components/CSSReset";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    const estilos = { 
        //backgroundColor: 'red',
        display: "flex",
        flexDirection: "column",
        flex: 1 
    };
    const [filter, setFilter] = React.useState("");
    
    return (
        <>
            <CSSReset />
            <div style={estilos}>
                <Menu filter={filter} setFilter={setFilter}/>
                <Header />
                <Timeline searchValue={filter.toLowerCase()} playlists={config.playlists}>
                </Timeline>
            </div>        
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        /* margin-top: 50px; */
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
        background-color: lightgrey;
    }
`;
const StyledBanner = styled.div`
    background-color: purple;
    background-image: url(${({ bg }) => bg });
    background-size: cover;    
    height: 230px;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />

            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{ config.name }</h2>
                    <p>{ config.job }</p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...props}) {
    const playlistNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map((name) => {
                const videos = props.playlists[name];
                return (
                    <section>
                        <h2>{name}</h2>
                        <div>
                            {videos
                                .filter((video) => video.title.toLowerCase().includes(searchValue))                             
                                .map((video) => {
                                    return (
                                        <a key={video.id} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                            })}
                        </div>
                    </section>
                )            
            })}
        </StyledTimeline>
    );
}