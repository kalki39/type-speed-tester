import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    margin : 0;
    padding : 0;
    box-sizing: border-box;

}
body{
    font-family: 'Ubuntu', sans-serif;
    background : ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
    margin : 0;
    padding : 0;
    transition : all 0.25 linear;
}
.canvas{
    display : grid;
    min-height : 100vh;
    grid-auto-flow : row;
    grid-template-row: auto 1fr auto;
    gap: 0.5rem;
    padding : 0.5rem;
    // width: 100vw;
    align-items: center;
    text-align: center;  
}

.type-box{
    display: block;
    width:1000px;
    margin-left:auto;
    margin-right : auto;
    overflow:hidden;
}
.words{
    font-size : 32px;
    display:flex;
    flex-wrap:wrap;
    color:${({ theme }) => theme.typeBoxText};
}
.word {
    margin:5px;
    padding-right:2px;
}
.hidden-input{
    opacity:0;
    pointer: none;
}

.current{
    border-left: 1px solid;
    animation: blinking 2s infinite;
    animation-timing-function: ease;

    @keyframes blinking{
        0%{border-left-color:${({ theme }) => theme.textColor};}
        25%{border-left-color:${({ theme }) => theme.background};}
        50%{border-left-color:${({ theme }) => theme.textColor};}
        75%{border-left-color:${({ theme }) => theme.background};}
        100%{border-left-color:${({ theme }) => theme.textColor};}
    }
}

.current-right{
    border-right: 1px solid;
    animation: blinking-right 2s infinite;
    animation-timing-function: ease;

    @keyframes blinking-right{
        0%{border-right-color:${({ theme }) => theme.textColor};}
        25%{border-right-color:${({ theme }) => theme.background};}
        50%{border-right-color:${({ theme }) => theme.textColor};}
        75%{border-right-color:${({ theme }) => theme.background};}
        100%{border-right-color:${({ theme }) => theme.textColor};}
    }
}
.header{
    display : flex;
    width:1000px;
    margin-left: auto;
    margin-right: auto;
    justify-content : space-between;
    padding :0.5 rem;
}
.logo{
    display:flex;
    cursor:pointer;
    align-items:center;
}
.project-title{
    display:flex;
    font-size: 1.5rem;
    align-items:center;
}
.correct{
    color : ${({ theme }) => theme.textColor};
}
.incorrect{
    color: red;
}

.upper-menu{
    display: flex;
    width : 1000px;
    margin-left: auto;
    margin-right: auto;
    font-size:1.15rem;
    justify-content : space-between;
    padding :0.5 rem;
    margin-bottom:1rem;
}
.modes{
    display: flex;
    gap : 0.4rem;
}

.time-mode{
    padding:3px;
}

.time-mode:hover{
    cursor: pointer;
    background-color:${({ theme }) => theme.textColor};
    color:${({ theme }) => theme.background};
    border-radius:10px;
}

.footer{
    display: flex;
    width : 1000px;
    margin-left: auto;
    margin-right: auto;
    justify-content : space-between;
    align-items: center;
    text-align: center;
}
.footer-left{
    display: flex;
    gap:5px;
    align-items:center;
}
.link{
    text-decoration: none;
    cursor: pointer;
    color: ${({ theme }) => theme.textColor};
}
.stats-box{
    display:flex;
    width:1000px;
    height:auto;
    margin-left:auto;
    margin-right:auto;
}
.left-stats{
    width:30%;
    padding : 30px;
}
.right-stats{
    width:70%;
}
.title{
    font-size:20px;
    color:${({ theme }) => theme.typeBoxText};
}
.subtitle{
    font-size:30px;
}
.user-profile{
    width: 1000px;
    margin : auto;
    display:flex;
    height: 15rem;
    background : ${({ theme }) => theme.typeBoxText};
    border-radius: 20px;
    padding:1rem;
    justify-content: center;
    align-text:center;
}

.user{
    width:50%;
    display:flex;
    margin-top:30px;
    margin-bottom:30px;
    font-size:1.5rem;
    padding:1rem;
    border-right : 2px solid;
}
.info{
    width:60%;
    padding:1rem;
    margin-top:1rem;
}
.picture{
    width:40%;
}

.total-tests{
    width:50%;
    display:flex;
    font-size: 3rem;
    align-items:center;
    justify-content:center;
}
.table, .graph-user-page{
    margin:auto;
    width:1000px;
}
.center-of-screen{
    display:flex;
    min-height:100vh;
    justify-content:center;
    align-items:center;
}
.alert-message{
    display:none;
}

@media screen and (max-width: 700px) {
    .canvas{
        gap:0;
        min-height : 95vh;
        padding:0;
    }
    .alert-message{
        display:block;
        margin-top:10px;
        animation: blink 1.5s infinite;
        @keyframes blink{
            0% {
                opacity: 1;
              }
              50% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
        }
    }
    .type-box {
      width:430px;
    }
    .footer{
        width:430px;
    }
    .header{
        width:430px;
    }
    .upper-menu{
        width:430px;
    }
    .user-profile{
        margin-top:10px;
        width: 430px;
        // margin : auto;
        display:flex;
    }
    
    .user{
        width:60%;
        display:flex;
        margin-top:10px;
        margin-bottom:20px;
        font-size:1.5rem;
        padding:1rem;
        border-right : 2px solid;
    }
    .info{
        width:100%;
        padding:1rem;
        margin-top:1rem;
    }
    .picture{
        width:0%;
        display:none;
    }
    
    .total-tests{
        width:40%;
        font-size: 2rem;
    }
    .table, .graph-user-page{
        margin:auto;
        width:430px;
    }
    .stats-box{
        width:400px;
    }
    
    .total-tests{
        font-size: 2rem;
    }

`;
