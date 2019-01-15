import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class Database {
	theConsole: string = "Console Messages";

 	options: any = {
     	name: 'swasthyacon.db',
     	location: 'default',
     	createFromLocation: 1
 	}

 	public db: SQLiteObject;

 	constructor(private sqlite: SQLite) {
     	this.connectToDb();
 	}
 
 	public connectToDb():void {console.log("hii");
     	this.sqlite.create(this.options)
         	.then((db: SQLiteObject) => {
            	this.db = db;
             	var user_query = 'CREATE TABLE IF NOT EXISTS `user`(`registration_id` INT PRIMARY KEY, `fname` VARCHAR(100), `mname` VARCHAR(100), `lname` VARCHAR(100), `gender` VARCHAR(10), `photo` VARCHAR(50), `qualification` VARCHAR(500), `speciality` VARCHAR(500), `mci_regno` VARCHAR(50), `email` VARCHAR(100), `mobile` VARCHAR(50), `street_address` VARCHAR(200), `city` VARCHAR(100), `state` VARCHAR(100), `country` VARCHAR(100), `pincode` VARCHAR(20), `contactno` VARCHAR(50), `delegate_type` VARCHAR(200), `is_active` INT NOT NULL, `create_date` VARCHAR(50), `modify_date` VARCHAR(50), `is_deleted` INT)';
             	this.db.executeSql(user_query, [])
             		.then(() => console.log('Executed SQL'+user_query))
             		.catch(e => console.log("Error: " + JSON.stringify(e)));
                var session_query = 'CREATE TABLE IF NOT EXISTS `tbl_sessions`(`session_id` INT PRIMARY KEY, `session_name` VARCHAR(100) DEFAULT NULL, `title` VARCHAR(500) DEFAULT NULL, `type` INT NOT NULL, `moderator` VARCHAR(1000) DEFAULT NULL, `chairman` VARCHAR(1000) DEFAULT NULL, `start_date` VARCHAR(100) DEFAULT NULL, `start_time` VARCHAR(50) DEFAULT NULL, `end_time` VARCHAR(50) DEFAULT NULL, `create_date` VARCHAR(100) DEFAULT NULL, `is_active` INT NOT NULL)';
                this.db.executeSql(session_query, [])
                    .then(() => console.log('Executed SQL'+session_query))
                    .catch(e => console.log("Error: " + JSON.stringify(e)));
                var session_details_query = 'CREATE TABLE IF NOT EXISTS `tbl_session_details`(`topic_id` INT PRIMARY KEY, `topic` VARCHAR(500) DEFAULT NULL, `speakers` VARCHAR(500) DEFAULT NULL, `session_id` VARCHAR(5) DEFAULT NULL, `start_time` VARCHAR(100) DEFAULT NULL, `end_time` VARCHAR(100) DEFAULT NULL, `create_date` VARCHAR(100) DEFAULT NULL, `is_active` INT NOT NULL)';
                this.db.executeSql(session_details_query, [])
                    .then(() => console.log('Executed SQL'+session_details_query))
                    .catch(e => console.log("Error: " + JSON.stringify(e)));
         	})
         	.catch(e => console.log("hii"+JSON.stringify(e)));
 	}

  	addUser(data){
  		console.log(data);
  		var sql = "SELECT * FROM `user` WHERE `registration_id` = '"+data.registration_id+"'";
     	this.db.executeSql(sql, [])
         	.then((result) => {
             	if(result.rows.length > 0) {
			     	this.db.executeSql('UPDATE `user` SET `fname`=?, `mname`=?, `lname`=?, `gender`=?, `photo`=?, `qualification`=?, `speciality`=?, `mci_regno`=?, `email`=?, `mobile`=?, `street_address`=?, `city`=?, `state`=?, `country`=?, `pincode`=?, `contactno`=?, `delegate_type`=?, `is_active`=?, `create_date`=?, `modify_date`=?, `is_deleted`=? WHERE `registration_id`=?', [data.fname, data.mname, data.lname, data.gender, data.photo, data.qualification, data.speciality, data.mci_regno, data.email, data.mobile, data.street_address, data.city, data.state, data.country, data.pincode, data.contactno, data.delegate_type, data.is_active, data.create_date, data.modify_date, data.is_deleted, data.registration_id])
			     		.then((res) => console.log('Executed SQL'+res))
			     		.catch(e => console.log("Error: " + JSON.stringify(e)));
             	}
             	else{
             		this.db.executeSql('INSERT INTO `user` (`registration_id`, `fname`, `mname`, `lname`, `gender`, `photo`, `qualification`, `speciality`, `mci_regno`, `email`, `mobile`, `street_address`, `city`, `state`, `country`, `pincode`, `contactno`, `delegate_type`, `is_active`, `create_date`, `modify_date`, `is_deleted`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.registration_id, data.fname, data.mname, data.lname, data.gender, data.photo, data.qualification, data.speciality, data.mci_regno, data.email, data.mobile, data.street_address, data.city, data.state, data.country, data.pincode, data.contactno, data.delegate_type, data.is_active, data.create_date, data.modify_date, data.is_deleted])
			     		.then((res) => console.log('Executed SQL'+res))
			     		.catch(e => console.log("Error: " + JSON.stringify(e)));
             	}
            
         	})
         	.catch(e => console.log(JSON.stringify(e)));	
 	}

 	getUserDetails(login_id) {
     	return this.db.executeSql('SELECT * FROM `user` WHERE `registration_id`=?', [login_id]).then((result) => {
         		console.log(JSON.stringify(result));
         		console.log(JSON.stringify(result.rows.item(0)));
             	return result.rows.item(0);
         	})
         	.catch(e => {
         		console.log(JSON.stringify(e))
         		return [];
         	});
 	}

    setSessions(sessions){
        for(let i = 0; i < sessions.length; i++){
            this.db.executeSql('SELECT * FROM `tbl_sessions` WHERE `session_id` = ?', [sessions[i].session_id])
                .then((result) => {
                    console.log(JSON.stringify(result));
                    if(result.rows.length > 0) {
                        this.db.executeSql('UPDATE `tbl_sessions` SET `session_name`=?, `title`=?, `type`=?, `moderator`=?, `chairman`=?, `start_date`=?, `start_time`=?, `end_time`=?, `create_date`=?, `is_active`=? WHERE `session_id`=?', [sessions[i].session_name, sessions[i].title, sessions[i].type, sessions[i].moderator, sessions[i].chairman, sessions[i].start_date, sessions[i].start_time, sessions[i].end_time, sessions[i].create_date, sessions[i].is_active, sessions[i].session_id])
                            .then((res) => console.log('Executed SQL'+res))
                            .catch(e => console.log("Error: " + JSON.stringify(e)));
                    }
                    else{
                        this.db.executeSql('INSERT INTO `tbl_sessions` (`session_id`, `session_name`, `title`, `type`, `moderator`, `chairman`, `start_date`, `start_time`, `end_time`, `create_date`, `is_active`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [sessions[i].session_id, sessions[i].session_name, sessions[i].title, sessions[i].type, sessions[i].moderator, sessions[i].chairman, sessions[i].start_date, sessions[i].start_time, sessions[i].end_time, sessions[i].create_date, sessions[i].is_active])
                            .then((res) => console.log('Executed SQL'+JSON.stringify(res)))
                            .catch(e => console.log("Error: " + JSON.stringify(e)));
                    }
                    return result;
                })
                .catch(e => console.log(JSON.stringify(e)));
        }
    }

    setSessionDetails(session_details){
        for(let i = 0; i < session_details.length; i++){
            this.db.executeSql('SELECT * FROM `tbl_session_details` WHERE `topic_id` = ?', [session_details[i].topic_id])
                .then((result) => {
                    console.log(JSON.stringify(result));
                    if(result.rows.length > 0) {
                        this.db.executeSql('UPDATE `tbl_session_details` SET `topic`=?, `speakers`=?, `session_id`=?, `start_time`=?, `end_time`=?, `create_date`=?, `is_active`=? WHERE `topic_id`=?', [session_details[i].topic, session_details[i].speakers, session_details[i].session_id, session_details[i].start_time, session_details[i].end_time, session_details[i].create_date, session_details[i].is_active, session_details[i].topic_id])
                            .then((res) => console.log('Executed SQL'+res))
                            .catch(e => console.log("Error: " + JSON.stringify(e)));
                    }
                    else{
                        this.db.executeSql('INSERT INTO `tbl_session_details` (`topic_id`, `topic`, `speakers`, `session_id`, `start_time`, `end_time`, `create_date`, `is_active`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [session_details[i].topic_id, session_details[i].topic, session_details[i].speakers, session_details[i].session_id, session_details[i].start_time, session_details[i].end_time, session_details[i].create_date, session_details[i].is_active])
                            .then((res) => console.log('Executed SQL'+JSON.stringify(res)))
                            .catch(e => console.log("Error: " + JSON.stringify(e)));
                    }
                    return result;
                })
                .catch(e => console.log(JSON.stringify(e)));
        }
    }

    getSessions() {
        let sql = "SELECT * FROM `tbl_sessions` WHERE `is_active`= 1";console.log(sql);
        return this.db.executeSql(sql, [])
            .then((result) => {
                console.log(JSON.stringify(result));
                let arraySession = [];
                if (result.rows.length > 0) {
                    for (var i =0; i < result.rows.length; i++) {
                        arraySession.push({
                            session_id: result.rows.item(i).session_id,
                            session_name: result.rows.item(i).session_name,
                            title: result.rows.item(i).title,
                            type: result.rows.item(i).type,
                            moderator: result.rows.item(i).moderator,
                            chairman: result.rows.item(i).chairman,
                            start_date: result.rows.item(i).start_date,
                            start_time: result.rows.item(i).start_time,
                            end_time: result.rows.item(i).end_time
                        });
                    }
                }
                return arraySession;
            })
            .catch(e => {
                console.log(JSON.stringify(e))
                return [];
            });
    }

    getSessionDetails(session_id) {console.log(session_id);
        let sql = "SELECT * FROM `tbl_session_details` WHERE `session_id`= "+session_id;
        return this.db.executeSql(sql, [])
            .then((result) => {
                console.log("executed:"+sql);
                console.log("result"+result);
                let arraySession = [];
                if (result.rows.length > 0) {
                    for (var i =0; i < result.rows.length; i++) {
                        arraySession.push({
                            topic_id: result.rows.item(i).topic_id,
                            topic: result.rows.item(i).topic,
                            speakers: result.rows.item(i).speakers,
                            session_id: result.rows.item(i).session_id,
                            start_time: result.rows.item(i).start_time,
                            end_time: result.rows.item(i).end_time
                        });
                    }
                }
                return arraySession;
            })
            .catch(e => {
                console.log(JSON.stringify(e))
                return [];
            });
    }
 	
}