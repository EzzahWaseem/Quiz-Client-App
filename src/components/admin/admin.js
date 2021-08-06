import React, { forwardRef, useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { getList, createList, updateList, deleteList } from '../../actions/posts';
import Typography from '@material-ui/core/Typography';

import { useDispatch, useSelector } from 'react-redux';
export default function Admin() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.posts);
  
  var [currentId, setcurrentId] = useState(0);
  var [deletedId, setDeletedId] = useState(0);
  useEffect(() => {
    dispatch(getList());
}, [currentId, deletedId, dispatch]);
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  const [columns] = useState([
    { title: 'Question', field: 'questions' },
    { title: 'Option A', field: 'optiona' },
    {
      title: 'Option B',
      field: 'optionb',

    },
    {
      title: 'Option C',
      field: 'optionc',
    },
    { title: 'Correct Answer', field: 'answer' },
  ]);

  const [data, setData] = useState(lists);
  useEffect(() => {
    setTimeout(() => {
      setData(lists)
    }, 0)
  }, [lists])

  return (
    <>
      {data ?

        <MaterialTable
          title="List of Quiz Questions"
          columns={columns}
          data={data}
          icons={tableIcons}

          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  dispatch(createList(newData));
                  resolve();
                }, 1000)
              })
            ,
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  currentId = oldData._id;
                  let ind = dataUpdate.findIndex(x => x._id === currentId)
                  setcurrentId(oldData._id)
                  dataUpdate[ind] = newData;
                  setData([...dataUpdate]);
                  dispatch(updateList(currentId, dataUpdate[ind]));
                  resolve();
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  deletedId = oldData._id;
                  setDeletedId(oldData._id);
                  dataDelete.splice(deletedId, 1);
                  setData([...dataDelete]);
                  dispatch(deleteList(deletedId))
                  resolve();
                }, 1000)
              }),
          }}

        />
        : <Typography variant="h4">Loading...</Typography>}


    </>
  )
}
