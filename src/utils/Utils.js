class Utils {
    constructor() {
    }

    doSort(inputArray, inputOrder) {
        const newSortArray = [...inputArray]

        switch (inputOrder) {
            case 'earlierDate':
                newSortArray.sort((a, b) =>
                    new Date(a['created_at']).getTime() - new Date(b['created_at']).getTime()
                )
                break;
            case 'newerDate':
                newSortArray.sort((a, b) =>
                    new Date(b['created_at']).getTime() - new Date(a['created_at']).getTime()
                )
                break;
            case 'moreLikes':
                newSortArray.sort((a, b) =>
                    b['likes']?.length - a['likes']?.length
                )
                break;
            default:
                newSortArray.sort((a, b) =>
                    new Date(b['created_at']).getTime() - new Date(a['created_at']).getTime()
                )
                break;
        }

        return newSortArray
    }
}

const utils = new Utils();

export default utils;