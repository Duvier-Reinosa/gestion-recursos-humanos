"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employesStatusController = void 0;
const database_1 = require("../database");
// create table actual_employe_status (
//     id serial primary key,
//     employe_id int not null,
//     employe_status_id int not null,
//     created_at timestamp not null default now(),
//     updated_at timestamp,
//     foreign key (id) references employes(id),
//     foreign key (id) references employe_status(id)
// );
class EmployesStatusController {
    listStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.db.query('SELECT * FROM actual_employe_status');
            res.json(response.rows);
        });
    }
    createStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { employe_id, employe_status_id } = req.body;
            const response = yield database_1.db.query('INSERT INTO actual_employe_status (employe_id, employe_status_id) VALUES ($1, $2)', [employe_id, employe_status_id]);
            res.json({
                message: 'Employe Status Added successfully',
                body: {
                    employe_status: { employe_id, employe_status_id }
                }
            });
        });
    }
    getStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const response = yield database_1.db.query('SELECT * FROM actual_employe_status WHERE id = $1', [id]);
            res.json(response.rows);
        });
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const { employe_id, employe_status_id } = req.body;
            const response = yield database_1.db.query('UPDATE actual_employe_status SET employe_id = $1, employe_status_id = $2 WHERE id = $3', [employe_id, employe_status_id, id]);
            res.json({
                message: 'Employe Status Updated successfully',
                body: {
                    employe_status: { employe_id, employe_status_id }
                }
            });
        });
    }
    deleteStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield database_1.db.query('DELETE FROM actual_employe_status WHERE id = $1', [id]);
            res.json(`Employe Status ${id} deleted Successfully`);
        });
    }
    createEmployeStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { employe_id, employe_status_id } = req.body;
            // first we need to check if the employe_id and employe_status_id exist in the database
            const exist = yield database_1.db.query('SELECT * FROM employes WHERE id = $1', [employe_id]);
            if (exist.rows.length === 0) {
                return res.json('Employe does not exist');
            }
            const existStatus = yield database_1.db.query('SELECT * FROM actual_employe_status WHERE id = $1', [employe_status_id]);
            if (existStatus.rows.length > 0) {
                yield database_1.db.query('DELETE FROM actual_employe_status WHERE id = $1', [employe_status_id]);
            }
            const response = yield database_1.db.query('INSERT INTO actual_employe_status (employe_id, employe_status_id) VALUES ($1, $2)', [employe_id, employe_status_id]);
            res.json({
                message: 'Employe Status Added successfully',
                body: {
                    employe_status: { employe_id, employe_status_id }
                }
            });
        });
    }
}
exports.employesStatusController = new EmployesStatusController();
