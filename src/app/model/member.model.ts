export interface Member{
    num:Number,
    name:String,
    familyName:String,
    nationality:String,
    identityDocument:String,
    identityNumber:String
}

export interface MemberPagination{
    totalItems: number,
    members:Member[], 
    totalPages: number,
    currentPage: number,
}