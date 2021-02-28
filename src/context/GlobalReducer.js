export const GlobalReducer = (state, action) => {
    switch (action.type){
        case 'SET_ALL_CONVERS':
            return {
                ...state,
                allConvers: action.payload
            }
            break;
        default:
            return state;
    }
}