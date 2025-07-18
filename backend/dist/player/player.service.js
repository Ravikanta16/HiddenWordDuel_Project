"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const player_entity_1 = require("../entities/player.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let PlayerService = class PlayerService {
    playerRepository;
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async create(createPlayerDto) {
        const { username, email, password } = createPlayerDto;
        const existingPlayer = await this.playerRepository.findOne({
            where: [{ username }, { email }],
        });
        if (existingPlayer) {
            throw new common_1.ConflictException('Username or email already exists');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const player = this.playerRepository.create({
            username,
            email,
            password: hashedPassword,
        });
        await this.playerRepository.save(player);
        return player;
    }
    async findOne(username) {
        return this.playerRepository.findOne({
            where: { username },
        });
    }
    async findById(id) {
        return this.playerRepository.findOne({
            where: { id },
        });
    }
    async findAllForTesting() {
        return this.playerRepository.find();
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlayerService);
//# sourceMappingURL=player.service.js.map