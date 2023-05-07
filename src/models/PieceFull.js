export default class PieceFull {
    constructor() {
        this.id = null;
        this.pieceName = null;
        this.pieceGenre = null;
        this.shortDescription = null;
        this.description = null;
        this.workerShortInformation = [
            {
                id: null,
                fullName: null,
                positionName: null,
                positionType: null,
                positionTypeName: null
            }
        ];
        this.pieceDates = [
            {
                date: null,
                pieceId: null,
                id: null,
            }
        ];
        this.mainPicture =
            {
                id: null,
                fileName: null,
                size: null,
                directUrl: null,
                uploadAt: null,
            };
        this.additionalPhotos = [
            {
                id: null,
                fileName: null,
                size: null,
                directUrl: null,
                uploadAt: null,
            }
        ];
        this.userReviews = [
            {
                description: null,
                title: null,
                userId: null,
                pieceId: null,
                id: null,
                userName: null,
                pieceName: null
            }
        ];
    }
}
