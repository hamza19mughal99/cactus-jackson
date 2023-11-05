import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#604845',
        color: '#fff',
        fontSize: '17px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: '17px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const MuiTables = ({ columns, data }) => {
    const navigate = useNavigate();
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((c, i) => (<StyledTableCell key={i}
                            align={i === 0 ? "" : "right"} >{c}</StyledTableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((d) => (
                        <StyledTableRow key={d.id}>
                            <StyledTableCell> {`${d.first_name} ${d.last_name}`} </StyledTableCell>
                            <StyledTableCell align="right"> {d.user_email} </StyledTableCell>
                            <StyledTableCell align="right"> {d.user_phone} </StyledTableCell>
                            <StyledTableCell align="right">
                                <button className='student_detail' onClick={() => navigate(`/admin/students/${d.id}`)}>Detail</button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};
export default MuiTables;