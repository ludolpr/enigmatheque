   SET GLOBAL log_bin_trust_function_creators=1;
DROP FUNCTION IF EXISTS fnStripTags;

DELIMITER |
CREATE FUNCTION fnStripTags( Dirty varchar(4000) )
RETURNS varchar(4000)
DETERMINISTIC 
BEGIN
  DECLARE iStart, iEnd, iLength int;
    WHILE Locate( '<', Dirty ) > 0 And Locate( '>', Dirty, Locate( '<', Dirty )) > 0 DO
      BEGIN
        SET iStart = Locate( '<', Dirty ), iEnd = Locate( '>', Dirty, Locate('<', Dirty ));
        SET iLength = ( iEnd - iStart) + 1;
        IF iLength > 0 THEN
          BEGIN
            SET Dirty = Insert( Dirty, iStart, iLength, '');
          END;
        END IF;
      END;
    END WHILE;
    RETURN Dirty;
END;
|
DELIMITER ;
SELECT fnStripTags('this <html>is <b>a test</b>, nothing more</html>');

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

SELECT
REGEXP_REPLACE(posting_items.description, '<[^>]*>|&nbsp;', '') AS clean_description
FROM table*


DELIMITER fnStripTags
CREATE FUNCTION `strip_tags`($str text) RETURNS text DETERMINISTIC
BEGIN
    DECLARE $start, $end INT DEFAULT 1;
    LOOP
        SET $start = LOCATE("<", $str, $start);
        IF (!$start) THEN RETURN $str; END IF;
        SET $end = LOCATE(">", $str, $start);
        IF (!$end) THEN SET $end = $start; END IF;
        SET $str = INSERT($str, $start, $end - $start + 1, "");
    END LOOP;
	RETURN $str;
END;
fnStripTags
DELIMITER ;