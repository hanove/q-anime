export class Anime {
    id: number;
    title: string;
    episodes: number;
    genres: string[];
    status: string;
    coverImageMedium: string;
    coverImageLarge: string;
    coverImageExtraLarge: string;


    public formatStatus() {
        switch (this.status) {
            case "FINISHED":
                this.status = "Terminado";
                break;
            case "RELEASING":
                this.status = "Em lançamento";
                break;
            case "NOT_YET_RELEASED":
                this.status = "Ainda não lançado";
                break;
            case "CANCELLED":
                this.status = "Cancelado";
                break;
            case "HIATUS":
                this.status = "Hiato";
                break;
        }
    }
}
