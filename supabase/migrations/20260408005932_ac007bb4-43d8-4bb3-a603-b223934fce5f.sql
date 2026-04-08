
CREATE POLICY "Authenticated users can insert counselors"
ON public.counselors
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete counselors"
ON public.counselors
FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update counselors"
ON public.counselors
FOR UPDATE
TO authenticated
USING (true);
