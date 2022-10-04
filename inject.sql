   SET GLOBAL log_bin_trust_function_creators=1;
DROP FUNCTION IF EXISTS fnStripTags;


CREATE FUNCTION fnStripTags($str text, $tag text,$keep_phrase bool) RETURNS text
    BEGIN
        DECLARE $start, $end INT DEFAULT 1;
        SET $str = COALESCE($str, '');
        LOOP
            SET $start = LOCATE(CONCAT('<', $tag), $str, $start);
            IF (!$start) THEN RETURN $str; END IF;
            IF ($keep_phrase) THEN
                SET $end = LOCATE('>', $str, $start);
                IF (!$end) THEN SET $end = $start; END IF;
                SET $str = INSERT($str, $start, $end - $start + 1, '');
                SET $str = REPLACE($str, CONCAT('</', $tag, '>'), '');
            ELSE
                SET $end = LOCATE(CONCAT('</', $tag, '>'),$str,$start);
                IF (!$end) THEN 
                    SET $end = LOCATE('/>',$str,$start); 
                    SET $str = INSERT($str, $start, $end - $start + 2, '');
                ELSE 
                    SET $str = INSERT($str, $start, $end - $start 
                       + LENGTH(CONCAT('</', $tag, '>')), '');
                END IF;
            END IF;
        END LOOP;
    END //
    |
DELIMITER ;
SELECT fnStripTags('this <html>is <b>a test</b>, nothing more</html>');