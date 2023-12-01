import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCard,selectCard } from "../app/features/cardSlice";
import {Box} from '@mui/system';



function Card(){

    const boxStyle={
        height:20,
            width:10,
            my:4,
            display:"flex",
            alignItems:"center",
            gap:4,
    }

    const {id}=useParams();
    console.log(id);
    const dispatch=useDispatch();
    // const card=useSelector(selectCard);
    // console.log(card);

    const fetchData=async()=>{
        await dispatch(fetchCard(`${id}`));
    }
    useEffect(() => {
        fetchData();
    }, [dispatch])
    

    return (
      <div>
        <div>
          <Box
            fontStyle={boxStyle}
          >
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              {card.name}
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {card.name}
            </Typography> */}

          </Box>
        </div>
      </div>
    );
}

export default Card;