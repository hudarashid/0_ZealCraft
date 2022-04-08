import React from 'react'
import styled from 'styled-components'
import { Link } from '@material-ui/core/index';

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
`;

const ListItem = styled.li`
    font-size: 20px;
    margin-bottom: 30px;
    cursor: pointer;
`;

const Company = styled.h1`
    font-size: 12px;
    font-weight: 400;
    font-style: italic;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
`;


const Footer = () => {
    return (

        <Wrapper>
            <Left></Left>
            <Center>
                <List>
                    <ListItem><Link>About</Link></ListItem>
                    <ListItem><Link>Contact</Link></ListItem>
                    <ListItem><Link>Privacy</Link></ListItem>
                </List>
                <Company>@ZealCraft 2022</Company>
            </Center>
            <Right></Right>
        </Wrapper>
    )
}

export default Footer