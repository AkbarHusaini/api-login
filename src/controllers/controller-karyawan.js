const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    karyawan(req,res){
        res.render("karyawan",{
            url: 'http://localhost:5050/',
            
        });
    },
    // Simpan data karyawan
    addDataKaryawan(req,res){
        let karyawan_id = req.body.karyawan_id;
        let karyawan_nama = req.body.karyawan_nama;
        let karyawan_umur = req.body.karyawan_umur;
        let karyawan_alamat = req.body.karyawan_alamat;
        let karyawan_jabatan = req.body.karyawan_jabatan;
        
        if (karyawan_id && karyawan_nama && karyawan_umur && karyawan_alamat && karyawan_jabatan) {
            
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO table_karyawan (kaeyawan_id,karyawan_nama,karyawan_umur,karyawan_alamat,karyawan_jabatan) VALUES (?,?,SHA2(?,512));`
                , [username, email, password],function (error, results) {
                    if (error) throw error;
                    
                    req.flash('color', 'success');
                    req.flash('status', 'Yes..');
                    req.flash('message', 'Registrasi berhasil');
                    
                    res.redirect('/karyawan');
                });
                
                connection.release();
            })
        } else {
            
            res.redirect('/login');
            res.end();
        }
    },
    // Update data karyawan
    editDataKaryawan(req,res){
        let dataEdit = {
            karyawan_nama : req.body.nama,
            karyawan_umur : req.body.umur,
            karyawan_alamat : req.body.alamat,
            karyawan_jabatan : req.body.jabatan
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE tabel_karyawan SET ? WHERE karyawan_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data!',
                });
            });
            connection.release();
        })
    },
    // Delete data karyawan
    deleteDataKaryawan(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM tabel_karyawan WHERE karyawan_id = ?;
                `
            )
            connection.release();
        })
    }
    
}