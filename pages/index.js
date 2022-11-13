import React from "react";
import styled from "styled-components";
import config from "../config.json";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgrundLevel1};
    color: ${({ theme }) => theme.textColorBase};

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {        
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;    
    }
`;
const StyledBanner = styled.div`
    height: 230px;    
    margin-top: 56px;    
    background-image: url(${({ bg }) => bg });
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;    
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

function Timeline({ searchValue, playlists }) {
    const playlistNames = Object.keys(playlists);
    return (
        <StyledTimeline>
            {playlistNames.map((name) => {
                const videos = playlists[name];
                const filteredVideos = videos.filter((video) => video.title.toLowerCase().includes(searchValue));
                const showList = filteredVideos.length > 0;
                return (
                     showList &&
                        (<section>
                                <h2>{name}</h2>
                                <div>
                                    {filteredVideos.map((video) => {
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
                            </section>)                                           
            )})}
        </StyledTimeline>
    )
}

function HomePage() {
    const estilos = {         
        display: "flex",
        flexDirection: "column",
        flex: 1 
    };
    const listTypes = [];
    listTypes[1] = "jogos";    

    const [filter, setFilter] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});
    const service = videoService();
    
    React.useEffect( () => {        
        service
            .getAllVideos()
            .then((res) => {

                const updatedPlaylists = {...playlists};
                res.data.forEach(video => {
                    const type = listTypes[video.playlist_id];
                    if (!updatedPlaylists[type]) updatedPlaylists[type] = [];                    
                    updatedPlaylists[type]?.push(video);
                });                
                setPlaylists(updatedPlaylists);
            });
    }, []);

    return (
        <>            
            <div style={estilos}>
                <Menu filter={filter} setFilter={setFilter}/>
                <Header />
                <Timeline searchValue={filter.toLowerCase()} playlists={playlists} />                
            </div>        
        </>
    );
}

export default HomePage;