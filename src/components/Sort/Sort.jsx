import React, {useState} from "react";
import {ButtonBase, Paper} from "@mui/material";

export const Sort = ({tabs, handleSort, sortOrder}) => {

    return (
        <Paper
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                Width: 500,
                minHeight: 30,
                borderRadius: 10,
                margin: 2,
                justifyContent: 'center',
            }}
        >
            {tabs.map((tab, ind) => {
                return (
                    <ButtonBase
                        style={{
                            fontSize: 14,
                            opacity: sortOrder === tab.id ? 1 : 0.6,
                        }}
                        type="button"
                        sx={{paddingTop: 1, paddingBottom: 1, paddingLeft: 2, paddingRight: 2}}
                        aria-label={tab.title}
                        onClick={() => {
                            handleSort(tab.id);
                        }}
                        key={ind}
                    >
                        {tab.title}
                    </ButtonBase>
                )
            })}
        </Paper>
    )
}
